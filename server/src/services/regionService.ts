import Region from "../models/Region";

export const getAllRegionsService = async () => {
    return await Region.find();
};

export const createRegionService = async (regionData: {
    nameRegion: string;
}) => {
    const newRegion = new Region(regionData);
    return await newRegion.save();
};