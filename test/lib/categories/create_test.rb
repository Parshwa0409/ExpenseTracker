require 'minitest/autorun'
require 'test/unit'
require '/Users/parshwapatil/Rails/expense-tracker/test/test_helper.rb'
require_relative '/Users/parshwapatil/Rails/expense-tracker/lib/categories/categories.rb'

describe Categories::Create do

    subject { Categories::Create }

    let(:category_params) do
        { name:"C1", budget:1001 }
    end

    let(:category_params_mock) do
        mock = Minitest::Mock.new
        mock.expect(:permit, category_params , [ :name, :budget, :bg_pic ])
        mock
    end

    let(:params_mock) do
        mock = Minitest::Mock.new
        mock.expect(:require, category_params_mock, [ :category ])
        mock
    end

    let(:category_class_mock) do
            mock = Minitest::Mock.new
            mock.expect(:create, category_instance_mock, [ category_params ])
            mock
    end

    describe 'PASS - CREATE RECORD' do 
        let(:errors_mock) do
        mock = Minitest::Mock.new
        mock.expect(:any?, false, [])
        mock
        end

        let(:category_instance_mock) do
            mock = Minitest::Mock.new
            mock.expect(:errors, errors_mock, [])
            mock.expect(:name, category_params[:name], [])
            mock
        end

        it 'test initialize' do
            test_obj = subject.new(params_mock, category_class_mock)
            assert_instance_of Categories::Create, test_obj
            puts "PASS - TEST INITIALIZE"
        end

        it 'if object created then name of budget is returned' do
            test_obj = subject.new(params_mock, category_class_mock)
            category_object = test_obj.create
            # byebug
            assert_equal category_params[:name], category_object.name
            puts "PASS - TEST CREATE"
        end
    end

    describe 'FAIL - CREATE RECORD' do 
        let(:errors_mock) do
        mock = Minitest::Mock.new
        mock.expect(:any?, true, [])
        mock
        end

        let(:category_instance_mock) do
            mock = Minitest::Mock.new
            mock.expect(:errors, errors_mock, [])
            mock.expect(:errors, ["ERROR WHILE CREATING THE OBJECT"], [])
            mock
        end

        it 'test initialize' do
            test_obj = subject.new(params_mock, category_class_mock)
            assert_instance_of Categories::Create, test_obj
            puts "PASS - TEST INITIALIZE"
        end

        
        it 'error array is populated when there are errors' do 
            test_obj = subject.new(params_mock, category_class_mock)
            category_object = test_obj.create
            assert_equal ["ERROR WHILE CREATING THE OBJECT"] , test_obj.err
            puts "PASS - TEST CREATE WITH ERROR"
        end
    end

end




=begin

class CategoriesCreateTest < Minitest::Test
    def setup
        params = { category: { name: "C1", budget: 1001 } }
        category_params = { name: "C1", budget: 1001 }

        category_params_mock = Minitest::Mock.new
        params_mock = Minitest::Mock.new

        @category_instance_mock = Minitest::Mock.new
        @category_class_mock = Minitest::Mock.new

        params_mock.expect(:require, category_params_mock, [:category])
        category_params_mock.expect(:permit, category_params, [:name, :budget, :bg_pic])
        
        @category_instance_mock.expect(:errors, [])
        @category_class_mock.expect(:create, @category_instance_mock, [ category_params ])

        @subject = Categories::Create.new(params: params_mock, category_class: @category_class_mock)
    end

    def test_returns_the_created_object
        category = @subject.create
    end
end

class CreateTest < Minitest::Test
    def setup
        @c_class_mock = Minitest::Mock.new

        category_params_mock = Minitest::Mock.new
        category_params = { name: "Bike Service & Repair", budget: 5000 } 
        category_params_mock.expect(:permit, category_params, [:name, :budget, :bg_pic])

        params_mock = Minitest::Mock.new
        params_mock.expect(:require, category_params_mock, [:category])

        # Create a mock object for category_instance
        category_instance_mock = Minitest::Mock.new

        # Stub the 'errors' method on the category_instance mock
        category_instance_mock.expect(:errors, [])

        # Expect 'create' method to be called with category_params
        @c_class_mock.expect(:create, Category.new(), [category_params])

        # Create an instance of Categories::Create and assign it to @create
        @create = Categories::Create.new(params_mock, @c_class_mock)
    end      

    def test_initialize
        assert_instance_of Categories::Create, @create
        puts "INSTANCE OF 'CATEGORIES::CREATE' IS VERIFIED!!!!"
    end

    def test_create_record
        # how to check the exact record
        assert_instance_of Category, @create.create
        puts "ALL GOOD, RECORD CREATED"
    end
end

def setup
    category_params_mock =  Minitest::Mock.new
    category_params = {name:"Bike Service & Repair",budget: 5000} 
    category_params_mock.expect :permit, category_params, [:name, :budget, :bg_pic]
    params_mock =  Minitest::Mock.new
    params = { category: {name:"Bike Service & Repair",budget: 5000} }
    params_mock.expect :require, category_params_mock, [:category]
    # Create a new Category instance
    category_instance = Category.new
    # Stub the 'errors' method on the category_instance
    category_instance.stub(:errors, nil)
    @c_class_mock = Minitest::Mock.new
    @c_class_mock.expect :create, category_instance, [ category_params ]
    # @c_class_mock.stub :errors, [], this will be called on Category, & i am creating the stub for the Categories::Create Class therefore an error
    # Category.any_instance.stub(:errors, nil), still not wroking
    @create = Categories::Create.new( params_mock, @c_class_mock )
end
=end