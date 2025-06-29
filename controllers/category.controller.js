import Category from "../models/categories.models.js";
import mongoose from "mongoose";

export const createCategory = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name } = req.body;

        if (!name ) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const existingCategory = await Category.findOne({ name }).session(session);

        if (existingCategory) {
            return res.status(400).json({ error: 'Category with this name already exists' });
        }

        const newCategory = await Category.create([{
            name,
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: 'Category created successfully',
            category: {
                id: newCategory[0]._id,
                name: newCategory[0].name,
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        if (categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}

export const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}

export const updateCategory = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true, session });

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: 'Category updated successfully',
            category: {
                id: updatedCategory._id,
                name: updatedCategory.name,
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const deleteCategory = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id, { session });

        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: 'Category deleted successfully',
            category: {
                id: deletedCategory._id,
                name: deletedCategory.name,
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}



