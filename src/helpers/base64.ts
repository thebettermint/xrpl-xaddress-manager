import fs from 'fs';

// function to encode file data to base64 encoded string
// @ts-ignore
export const base64_encode = (file:string) => {
    return "data:image/gif;base64," + fs.readFileSync(file, 'base64');
}