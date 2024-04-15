require 'test/unit'
require 'minitest/autorun'
require '/Users/parshwapatil/Rails/expense-tracker/test/test_helper.rb'
require_relative '/Users/parshwapatil/Rails/expense-tracker/lib/categories/categories.rb'

class IndexTest < Minitest::Test
    def setup
        @c_class_mock = Minitest::Mock.new
        @c_class_mock.expect :all, []
        @c_class_mock.expect :order, [], [:name]
        @c_class_mock.expect :count, 0
        @index = Categories::Index.new(category_class=@c_class_mock)
    end

    def test_initialize
        assert_instance_of Categories::Index, @index
    end

    def test_get_records
        assert_equal [], @index.get_records()
        puts "ALL GOOD, ALL THE RECORDS FETCHED"
    end

    def test_validate
        assert_equal false, @index.validate()
        puts "Categories::Index.validate() "
    end
end
