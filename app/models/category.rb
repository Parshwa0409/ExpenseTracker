class Category < ApplicationRecord
    has_one_attached :bg_pic
    has_many :expenses


    validates :name, presence:  { message: "Name cannot be empty. Please provide a name for this category." }, uniqueness: {message: "already exists. Please choose a different name."}
    validates :budget, presence: { message: "Budget cannot be empty. Please provide a budget for this category." }
end
