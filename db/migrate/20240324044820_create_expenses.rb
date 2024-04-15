class CreateExpenses < ActiveRecord::Migration[7.1]
  def change
    create_table :expenses do |t|
      t.string :name
      t.date :on_date
      t.integer :amount
      t.belongs_to :category, foreign_key: true

      t.timestamps
    end
  end
end
