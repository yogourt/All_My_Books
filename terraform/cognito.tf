resource "aws_cognito_user_pool" "app_users" {
  name                     = "all_my_books_user_pool"
  alias_attributes         = ["email"]
  auto_verified_attributes = ["email"]
  password_policy {
    minimum_length                   = 6
    require_symbols                  = false
    require_uppercase                = false
    require_numbers                  = false
    temporary_password_validity_days = 7
  }
}

resource "aws_cognito_user_pool_client" "cognito_client" {
  name                = "all_my_books_client"
  user_pool_id        = aws_cognito_user_pool.app_users.id
  explicit_auth_flows = ["USER_PASSWORD_AUTH"]
  id_token_validity   = 6
}