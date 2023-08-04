import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET=async (request:any, {params}:{params:any}) => {
    try {
        await connectToDB();
        params.id
        const prompts = await Prompt.find({
            creator:params.id
        }).populate('creator');
        return new Response(JSON.stringify(prompts),{status: 200})
    } catch (error) {
        return new Response("Failed to Fetch",{status: 500})
    }
    
}