class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]
 
  def profile
    render json: { user: UserSerializer.new(current_user) }, status: :accepted
  end
 
  def create
    @user = User.create(user_params)
    if @user.valid?
      @token = encode_token({ user_id: @user.id })
      render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
    else
      render json: { error: 'failed to create user' }, status: :not_acceptable
    end
  end

  def recommendations
    top_three_events = current_user.most_attended_event_type
    render json: {top_three_events: top_three_events}
  end
 
  private
 
  def user_params
    params.require(:user).permit(:username, :password, :bio, :avatar)
  end
end