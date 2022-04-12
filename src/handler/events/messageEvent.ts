import type { ChatInputCommandInteraction, Message } from 'discord.js';
import { fromEvent,  Observable, of, concatMap } from 'rxjs';
import { CommandType } from '../sern';
import Context from '../structures/context';
import type Wrapper from '../structures/wrapper';
import { fmt } from '../utilities/messageHelpers';
import * as Files from '../utilities/readFile';
import { filterTap, ignoreNonBot } from './observableHandling';

export const onMessageCreate = (wrapper : Wrapper) => {
    const { client, defaultPrefix } = wrapper;
    (<Observable<Message>> fromEvent( client, 'messageCreate'))
    .pipe ( 
        ignoreNonBot(defaultPrefix),
        concatMap ( m =>  {
        const [ prefix, ...data ] = fmt(m, defaultPrefix);
        const posMod = Files.Commands.get(prefix) ?? Files.Alias.get(prefix);

        return of( posMod )
                .pipe (
                    filterTap(CommandType.TEXT, mod => {
                        const ctx = Context.wrap(m);
                        mod.execute(ctx, ['text', data]); 
                    })
               );
        })
    ).subscribe ({
       error(e) {
        //log things
        throw e;
       },
       next(command) {
        //log on each command emitted 
        console.log(command);
       },
    }); 


};
