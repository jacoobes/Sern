
import type { Interaction } from 'discord.js';
import { fromEvent,  Observable, of,  concatMap } from 'rxjs';
import { CommandType } from '../sern';
import Context from '../structures/context';
import type Wrapper from '../structures/wrapper';
import * as Files from '../utilities/readFile';
import { filterTap } from './observableHandling';
import { filter } from 'rxjs';

export const onInteractionCreate = ( wrapper : Wrapper ) => {
      const { client } = wrapper;  

      (<Observable<Interaction>> fromEvent(client, 'interactionCreate'))
      .pipe(
        filter( i => i.inGuild() ),
        concatMap ( interaction => {
            if (interaction.isChatInputCommand()) {
                return of(Files.Commands.get(interaction.commandName))
                .pipe(
                    filterTap(CommandType.SLASH, mod => {
                        const ctx = Context.wrap(interaction);
                        mod.execute(ctx, ['slash', interaction.options]);
                    }),
                 );
            }
            if (interaction.isContextMenuCommand()) {
                return of(Files.ContextMenuUser.get(interaction.commandName))
                .pipe(
                    filterTap(CommandType.MENU_USER, mod => { 
                        mod.execute(interaction);
                    }),
                );
            }
            if (interaction.isMessageContextMenuCommand()) {
                return of(Files.ContextMenuMsg.get(interaction.commandName))
                .pipe(
                    filterTap(CommandType.MENU_MSG, mod => {
                        mod.execute(interaction);
                    }),
                );
            }
            if (interaction.isButton()) {
                return of(Files.Buttons.get(interaction.customId))
                .pipe(
                    filterTap(CommandType.BUTTON, mod => {
                        mod.execute(interaction);
                    })
                );
            }
            if (interaction.isSelectMenu()) {
                return of(Files.SelectMenus.get(interaction.customId))
                .pipe(
                    filterTap(CommandType.MENU_SELECT, mod => {
                        mod.execute(interaction);
                    })
                );
            }
            else { return of(); }
        })
      ).subscribe({
       error(e) {
        throw e;
       },
       next(command) {
        //log on each command emitted 
        console.log(command?.name);
       },
   });
};

