resource "aws_api_gateway_rest_api" "backend_api" {
  name = "all_my_books_api"
}

resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.backend_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.api_proxy_resource,
      aws_api_gateway_method.api_proxy_any_method,
      aws_api_gateway_integration.api_proxy_lambda_integration,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "api_stage_dev" {
  deployment_id = aws_api_gateway_deployment.api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  stage_name    = "dev"
}

resource "aws_api_gateway_resource" "api_proxy_resource" {
  parent_id   = aws_api_gateway_rest_api.backend_api.root_resource_id
  path_part   = "{proxy+}"
  rest_api_id = aws_api_gateway_rest_api.backend_api.id
}

resource "aws_api_gateway_method" "api_proxy_any_method" {
  authorization = "NONE"
  http_method   = "ANY"
  resource_id   = aws_api_gateway_resource.api_proxy_resource.id
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
}

resource "aws_api_gateway_integration" "api_proxy_lambda_integration" {
  http_method             = aws_api_gateway_method.api_proxy_any_method.http_method
  integration_http_method = "POST"
  resource_id             = aws_api_gateway_resource.api_proxy_resource.id
  rest_api_id             = aws_api_gateway_rest_api.backend_api.id
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.backend_lambda_proxy.invoke_arn
}
