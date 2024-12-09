import { Coach, User } from "../models/relations.model.js";
import { validateObjectId } from "../utils/utils.js";

const assign_coach_to_user = async (req, res) => {
    const { coachId, userId } = req.body;

    // Validate input
    if (!coachId || !userId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate ObjectIds
    if (!validateObjectId(coachId) || !validateObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid coach or user ID' });
    }

    try {
        // Check if coach exists
        const coach = await Coach.findById(coachId);
        if (!coach) {
            return res.status(404).json({ message: 'Coach not found' });
        }

        // Check if user exists
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assign the coach to the user
        await User.findByIdAndUpdate(user._id, {
            $addToSet: { assignedCoaches: coach._id },
            $push: {
                sessionHistory: {
                    date: new Date(),
                    type: 'coach',
                    partnerId: coach._id
                }
            }
        });

        // Optionally, you might want to update the coach's record as well
        await Coach.findByIdAndUpdate(coachId, {
            $addToSet: { assignedUsers: user._id }
        });

        res.status(200).json({ message: 'Coach assigned successfully' });
    } catch (error) {
        console.error('Error assigning coach:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export {assign_coach_to_user}