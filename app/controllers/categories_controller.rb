require_relative '/Users/parshwapatil/Rails/expense-tracker/lib/categories/categories.rb'

class CategoriesController < ApplicationController
    before_action :get_category, only: [:update, :edit, :destroy, :show]
    before_action :new_category, only: [:new]

    def index
        @index_category = Categories::Index.new()
    end

    def show
    end

    def new
    end

    def edit
    end

    def create
        create_category = Categories::Create.new(params)
        @category = create_category.create()
        proceed_ahead(create_category, @category, :new)
    end

    def update
        update_category = Categories::Update.new(params, @category)
        @category = update_category.update()
        proceed_ahead(update_category, @category, :edit)
    end

    def destroy
        if @category.present?
            Categories::Destroy.new(@category).destroy
            redirect_to categories_path
        end
    end

    private
    def get_category
        @category = Category.find_by(id: params[:id])
    end

    def new_category
        @category = Category.new()
    end

    def proceed_ahead(category_class, category_instance, form_page)
        respond_to do |format|
            if Categories.any_errors?(category_class.err)
                format.html { render form_page, alert:  Categories.err_msg(category_class.err) ,status: :unprocessable_entity }
                format.json { render json: category_instance.errors, status: :unprocessable_entity }
            else
                format.html { redirect_to category_url(category_instance), notice: "Category was successfully created." }
                format.json { render :show, status: :created, location: category_instance }
            end
        end
    end
end
