import Staff from "../models/staff.models.js";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const createStaff = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
       const {name, email, password,phone_number,address,role} = req.body;
         if (!name || !email || !password || !phone_number || !address || !role) {
              return res.status(400).json({ error: 'All fields are required' });
         }
        const existingStaff = await Staff.findOne({ email }).session(session);
        if (existingStaff) {
            return res.status(400).json({ error: 'Staff with this email already exists' });
        }
        const newStaff = await Staff.create({
            name,
            email,
            password,
            phone_number,
            address,
            role
        });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            message: 'Staff created successfully',
            staff: {
                id: newStaff._id,
                name: newStaff.name,
                email: newStaff.email,
                phone_number: newStaff.phone_number,
                address: newStaff.address,
                role: newStaff.role
            }
        });
    }catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const loginStaff = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const staff = await Staff.findOne({ email });
        if (!staff) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isMatch = await staff.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: staff._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({
            message: 'Login successful',
            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                phone_number: staff.phone_number,
                address: staff.address,
                role: staff.role
            }
        });
    } catch (error) {
        next(error);
    }
}

export const getStaffProfile = async (req, res, next) => {
    try {
        const staffId = req.staff.id;
        const staff = await Staff.findById(staffId).select('-password');
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        res.status(200).json({
            message: 'Staff profile retrieved successfully',
            staff
        });
    } catch (error) {
        next(error);
    }
}

export const updateStaffProfile = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const staffId = req.staff.id;
        const { name, email, phone_number, address } = req.body;
        if (!name || !email || !phone_number || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const updatedStaff = await Staff.findByIdAndUpdate(
            staffId,
            { name, email, phone_number, address },
            { new: true, session }
        );
        if (!updatedStaff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({
            message: 'Staff profile updated successfully',
            staff: {
                id: updatedStaff._id,
                name: updatedStaff.name,
                email: updatedStaff.email,
                phone_number: updatedStaff.phone_number,
                address: updatedStaff.address,
                role: updatedStaff.role
            }
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const deleteStaff = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const staffId = req.staff.id;
        const deletedStaff = await Staff.findByIdAndDelete(staffId).session(session);
        if (!deletedStaff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({
            message: 'Staff deleted successfully'
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const getAllStaff = async (req, res, next) => {
    try {
        const staffList = await Staff.find().select('-password');
        res.status(200).json({
            message: 'Staff list retrieved successfully',
            staff: staffList
        });
    } catch (error) {
        next(error);
    }
}