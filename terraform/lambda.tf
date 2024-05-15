resource "aws_lambda_function" "backend_lambda_proxy" {
  function_name    = "all_my_books_backend"
  role             = aws_iam_role.iam_for_backend_lambda.arn
  filename         = data.archive_file.backend_lambda_archive.output_path
  source_code_hash = data.archive_file.backend_lambda_archive.output_base64sha256
  runtime          = "nodejs18.x"
  handler          = "dist/lambda.handler"

  environment {
    variables = {
      books_table : aws_dynamodb_table.books_table.name
      notes_table : aws_dynamodb_table.notes_table.name
      user_books_table : aws_dynamodb_table.user_books_table.name
    }
  }
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_backend_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "archive_file" "backend_lambda_archive" {
  type        = "zip"
  source_dir  = "../backend"
  excludes    = ["src", "tsconfig.json", "tslint.json"]
  output_path = "archive/backend_lambda_function.zip"
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.backend_lambda_proxy.function_name
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "${aws_api_gateway_rest_api.backend_api.execution_arn}/*/*"
}

data "aws_iam_policy_document" "lambda_policy" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = ["arn:aws:logs:*:*:*"]
  }
  statement {
    effect = "Allow"

    actions = [
      "dynamodb:GetItem",
      "dynamodb:Query",
      "dynamodb:PutItem",
      "dynamodb:Scan",
      "dynamodb:BatchGetItem"
    ]

    resources = [
      aws_dynamodb_table.books_table.arn,
      aws_dynamodb_table.notes_table.arn,
      "${aws_dynamodb_table.user_books_table.arn}*"
    ]
  }
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "lambda_logging"
  description = "IAM policy for logging from a lambda"
  policy      = data.aws_iam_policy_document.lambda_policy.json
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_for_backend_lambda.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}