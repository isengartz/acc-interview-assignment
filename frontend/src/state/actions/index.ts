import { SoundFileAction } from './soundFileActions';
import { ModalAction } from './modalActions';

export * from './soundFileActions';
export * from './modalActions';

export type Action = SoundFileAction | ModalAction;
