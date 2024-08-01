class ApplicationController < ActionController::API
  protect_from_forgery with: :null_session, if: -> { request.format.json? }
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name])

    devise_parameter_sanitizer.permit(:account_update, keys: %i[name])
  end
  private

  def augment_with_image(post)
    if post.image.attached?
      post.as_json.merge(image_url: url_for(post.image))
    else
      post.as_json.merge(image_url: nil)
    end
  end

  def paginate_posts(posts, posts_per_page)
    paginated_posts = posts.page(params[:page]).per(posts_per_page)
    paginated_posts.map { |post| augment_with_image(post) }
  end
end
