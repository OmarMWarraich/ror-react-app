# frozen_string_literal: true

class Api::V1::Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_signed_out_user, only: :destroy
  respond_to :json

  def create
    user = User.find_by(email: params[:user][:email])
    if user&.valid_password?(params[:user][:password])
      sign_in(user)
      render json: {
        status: {code: 200, message: 'Logged in successfully.'},
        data: UserSerializer.new(user).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def destroy
    current_user = warden.user
    Devise.sign_out_all_scopes
    render json: {
      status: {code: 200, message: 'Logged out successfully.'}
    }, status: :ok
  end
end
