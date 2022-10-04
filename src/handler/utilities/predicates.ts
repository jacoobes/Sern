import {
    AutocompleteInteraction,
    Interaction,
    InteractionType,
    type ModalSubmitInteraction,
    type ButtonInteraction,
    type SelectMenuInteraction,
    type ChatInputCommandInteraction,
    type UserContextMenuCommandInteraction,
    type MessageContextMenuCommandInteraction,
} from 'discord.js';
import type {
    DiscordEventCommand,
    ExternalEventCommand,
    SernEventCommand,
} from '../structures/events';
import { EventType } from '../..';
import type { CommandModuleDefs, EventModule, Module } from '../../types/module';

export function correctModuleType<T extends keyof CommandModuleDefs>(
    plug: Module | undefined,
    type: T,
): plug is CommandModuleDefs[T] {
    // Another way to check if type is equivalent,
    // It will check based on flag system instead
    return plug !== undefined && (plug.type & type) !== 0;
}

export function isApplicationCommand(
    interaction: Interaction,
): interaction is
    | ChatInputCommandInteraction
    | UserContextMenuCommandInteraction
    | MessageContextMenuCommandInteraction {
    return interaction.type === InteractionType.ApplicationCommand;
}

export function isModalSubmit(interaction: Interaction): interaction is ModalSubmitInteraction {
    return interaction.type === InteractionType.ModalSubmit;
}
export function isAutocomplete(interaction: Interaction): interaction is AutocompleteInteraction {
    return interaction.type === InteractionType.ApplicationCommandAutocomplete;
}
export function isMessageComponent(
    interaction: Interaction,
): interaction is ButtonInteraction | SelectMenuInteraction {
    return interaction.type === InteractionType.MessageComponent;
}

export function isDiscordEvent(el: EventModule): el is DiscordEventCommand {
    return el.type === EventType.Discord;
}
export function isSernEvent(el: EventModule): el is SernEventCommand {
    return el.type === EventType.Sern;
}

export function isExternalEvent(el: EventModule): el is ExternalEventCommand {
    return el.type === EventType.External && 'emitter' in el;
}

// export function isEventPlugin<T extends CommandType>(
//     e: CommandModulePlugin<T>,
// ): e is EventPlugin<T> {
//     return e.type === PluginType.Event;
// }
// export function isCommandPlugin<T extends CommandType>(
//     e: CommandModulePlugin<T>,
// ): e is CommandPlugin<T> {
//     return !isEventPlugin(e);
// }
