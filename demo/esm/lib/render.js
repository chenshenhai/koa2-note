import { PROJECT_PATH } from './path.js';
import fs from 'fs';
import path from 'path'

export const render = ( view ) => {
    let viewPath = path.join(PROJECT_PATH, 'view',`${view}.html`);
    if ( fs.existsSync(viewPath) ) {
        return fs.readFileSync(viewPath, 'binary');
    } else {
        return `Error: file ${view}.html is not found!`;
    }
}