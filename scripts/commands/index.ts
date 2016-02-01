import {configure} from './configure.ts';
import {send} from './send.ts';
import {watch} from './watch.ts';

export module Commands {
    export var configure = configure;
    export var send = send;
    export var watch = watch;
}
