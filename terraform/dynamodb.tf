resource "aws_dynamodb_table" "users_table" {
  name         = "all_my_books_users"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "email"
  attribute {
    name = "email"
    type = "S"
  }
}

resource "aws_dynamodb_table" "books_table" {
  name         = "all_my_books_books"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "author"
  range_key    = "title"
  attribute {
    name = "author"
    type = "S"
  }
  attribute {
    name = "title"
    type = "S"
  }
}

resource "aws_dynamodb_table" "notes_table" {
  name         = "all_my_books_notes"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "timestamp"
  global_secondary_index {
    name            = "notes_by_book"
    hash_key        = "bookId"
    range_key       = "timestamp"
    projection_type = "ALL"
  }
  attribute {
    name = "userId"
    type = "S"
  }
  attribute {
    name = "timestamp"
    type = "N"
  }
  attribute {
    name = "bookId"
    type = "S"
  }
}