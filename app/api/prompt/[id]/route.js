import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
   try {
      await connectToDB();
      const prompt = await Prompt.findById(params.id).populate('creator');
      if (!prompt) {
         return new Response('Prompt Not found', { status: 404 });
      }
      return new Response(JSON.stringify(prompt), { status: 200 });
   } catch (err) {
      return new Response('Failed to fetch', { status: 500 });
   }
};

export const PATCH = async (request, { params }) => {
   const { prompt, tag } = await request.json();

   try {
      await connectToDB();
      const existingPrompt = await Prompt.findById(params.id);
      if (!prompt) {
         return new Response('Prompt Not found', { status: 404 });
      }
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      await existingPrompt.save();

      return new Response(JSON.stringify(existingPrompt), { status: 200 });
   } catch (err) {
      return new Response('Failed to update', { status: 500 });
   }
};

export const DELET = async (request, { params }) => {
   const { prompt, tag } = await request.json();

   try {
      await connectToDB();
      await Prompt.findByIdAndDelete(params.id);

      return new Response('Prompt Deleted', { status: 200 });
   } catch (err) {
      return new Response('Failed to Delete', { status: 500 });
   }
};
