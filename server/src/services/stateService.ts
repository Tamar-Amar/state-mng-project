import State from '../models/State';

export const getAllStatesService = async () => {
    try {
        const states = await State.find({ isActive: true });
        return states;
    } catch (error) {
        throw new Error(`Error fetching states: ${(error as Error).message}`);
    }
};

export const getStateByIdService = async (id: string) => {
    try {
        const state = await State.findOne({ _id: id, isActive: true });
        return state;
    } catch (error) {
        throw new Error(`Error fetching state by ID: ${(error as Error).message}`);
    }
};

export const createStateService = async (stateData: {
    name: string;
    flag: string;
    population: number;
    region: string;
    isActive: boolean;
}) => {
    const existingState = await State.findOne({ name: stateData.name });
    if (existingState) {
        if (!existingState.isActive) {
            return { exists: true, isDeleted: true, state: existingState };
        }
        return { exists: true, isDeleted: false, state: existingState };
    }
    const newState = new State(stateData);
    await newState.save();
    return { exists: false, state: newState };
};

export const restoreStateService = async (id: string) => {
    return await State.findByIdAndUpdate(
        id,
        { isActive: true },
        { new: true }
    );
};

export const updateStateService = async (id: string, updateData: Partial<{
    name: string;
    flag: string;
    population: number;
    region: string;
    isActive: boolean;
}>) => {
    return await State.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const deleteStateService = async (id: string) => {
    try {
        const deletedState = await State.findByIdAndUpdate(
            id,
            { isActive: false }, 
            { new: true }
        );
        return deletedState;
    } catch (error) {
        throw new Error(`Error deleting state: ${(error as Error).message}`);
    }
};

