module Categories
    def self.any_errors?(errors)
        return errors.nil? ? false : true
    end

    def self.err_msg(errors)
        msg = ""
        errors.each do |e|
            msg += "Category #{e.options[:message]} <br/>".upcase()
        end
        return msg.html_safe
    end

    private
    def self.get_params(params)
        return params.require(:category).permit(:name, :budget, :bg_pic)
    end


    # CREATE
    class Create
        attr_reader :category_class
        attr_reader :err
        def initialize(params, category_class=Category)
            @params = params
            @err = nil
            @category_class = category_class
        end

        def create
            category = @category_class.create(Categories.get_params(@params))

            if category.errors.any?
                @err = category.errors
            end

            return category
        end

    end

    # READ
    class Index
        attr_reader :category_class
        def initialize(category_class=Category)
            @category_class = category_class
        end
        
        def get_records
            return @category_class.order(:name)
        end

        def validate
            return @category_class.count > 0 ? true : false
        end
    end

    # UPDATE
    class Update
        attr_reader :err
        def initialize(params, category)
            @params = params
            @err = nil
            @category = category
        end

        def update
            @category.update(Categories.get_params(@params))

            if @category.errors.any?
                @err = @category.errors
            end

            return @category
        end
    end

    # DELETE
    class Destroy
        def initialize(category)
            @category = category
        end

        def destroy
            @category.destroy
        end
    end
end