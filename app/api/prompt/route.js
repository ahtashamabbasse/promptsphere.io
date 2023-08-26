import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import { shuffleArray } from '@utils/common';

export const GET = async () => {
   try {
      await connectToDB();
      const allPrompts = await Prompt.find().populate('creator');
      const newArray = shuffleArray(allPrompts);
      return new Response(JSON.stringify(newArray), { status: 200 });
   } catch (err) {
      return new Response('Failed to fetch', { status: 500 });
   }
};
