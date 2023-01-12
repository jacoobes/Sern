import type {
    ApplicationCommandAttachmentOption,
    ApplicationCommandChannelOptionData,
    ApplicationCommandChoicesData,
    ApplicationCommandNonOptionsData,
    ApplicationCommandNumericOptionData,
    ApplicationCommandOptionData,
    ApplicationCommandOptionType,
    ApplicationCommandSubCommandData,
    ApplicationCommandSubGroupData,
    AutocompleteInteraction,
    Awaitable,
    BaseApplicationCommandOptionsData,
    ButtonInteraction,
    MessageContextMenuCommandInteraction,
    ModalSubmitInteraction,
    UserContextMenuCommandInteraction,
    ChannelSelectMenuInteraction,
    MentionableSelectMenuInteraction,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
} from 'discord.js';
import { CommandType } from '../handler/structures/enums';
import type { Args, SlashOptions } from './handler';
import type Context from '../handler/structures/context';
import type { InitPlugin, ControlPlugin } from './plugin';
import { EventType } from '../handler/structures/enums';
import type { UserSelectMenuInteraction } from 'discord.js';
import type { AnyCommandPlugin, AnyEventPlugin } from './plugin';
import type { SernEventsMapping } from './handler';
import type { ClientEvents } from 'discord.js';

export interface Module {
    type: CommandType | EventType;
    name?: string;
    onEvent: ControlPlugin[];
    plugins: InitPlugin[];
    description?: string;
    execute: (...args: any[]) => Awaitable<any>;
}

export interface TextCommand extends Module {
    type: CommandType.Text;
    alias?: string[];
    execute: (ctx: Context, args: ['text', string[]]) => Awaitable<unknown>;
}

export interface SlashCommand extends Module {
    type: CommandType.Slash;
    description: string;
    options?: SernOptionsData[];
    execute: (ctx: Context, args: ['slash', SlashOptions]) => Awaitable<unknown>;
}

export interface BothCommand extends Module {
    type: CommandType.Both;
    alias?: string[];
    description: string;
    options?: SernOptionsData[];
    execute: (ctx: Context, args: Args) => Awaitable<unknown>;
}

export interface ContextMenuUser extends Module {
    type: CommandType.CtxUser;
    execute: (ctx: UserContextMenuCommandInteraction) => Awaitable<unknown>;
}

export interface ContextMenuMsg extends Module {
    type: CommandType.CtxMsg;
    execute: (ctx: MessageContextMenuCommandInteraction) => Awaitable<unknown>;
}

export interface ButtonCommand extends Module {
    type: CommandType.Button;
    execute: (ctx: ButtonInteraction) => Awaitable<unknown>;
}

export interface StringSelectCommand extends Module {
    type: CommandType.StringSelect;
    execute: (ctx: StringSelectMenuInteraction) => Awaitable<unknown>;
}

export interface ChannelSelectCommand extends Module {
    type: CommandType.ChannelSelect;
    execute: (ctx: ChannelSelectMenuInteraction) => Awaitable<unknown>;
}

export interface RoleSelectCommand extends Module {
    type: CommandType.RoleSelect;
    execute: (ctx: RoleSelectMenuInteraction) => Awaitable<unknown>;
}

export interface MentionableSelectCommand extends Module {
    type: CommandType.MentionableSelect;
    execute: (ctx: MentionableSelectMenuInteraction) => Awaitable<unknown>;
}

export interface UserSelectCommand extends Module {
    type: CommandType.UserSelect;
    execute: (ctx: UserSelectMenuInteraction) => Awaitable<unknown>;
}

export interface ModalSubmitCommand extends Module {
    type: CommandType.Modal;
    execute: (ctx: ModalSubmitInteraction) => Awaitable<unknown>;
}

export interface AutocompleteCommand
    extends Omit<Module, 'name' | 'type' | 'plugins' | 'description'> {
    onEvent: ControlPlugin[];
    execute: (ctx: AutocompleteInteraction) => Awaitable<unknown>;
}

export interface SernEventCommand<T extends keyof SernEventsMapping = keyof SernEventsMapping>
    extends Module {
    name?: T;
    type: EventType.Sern;
    execute(...args: SernEventsMapping[T]): Awaitable<unknown>;
}

export interface DiscordEventCommand<T extends keyof ClientEvents = keyof ClientEvents>
    extends Module {
    name?: T;
    type: EventType.Discord;
    execute(...args: ClientEvents[T]): Awaitable<unknown>;
}

export interface ExternalEventCommand extends Module {
    name?: string;
    emitter: string;
    type: EventType.External;
    execute(...args: unknown[]): Awaitable<unknown>;
}

export type EventModule = DiscordEventCommand | SernEventCommand | ExternalEventCommand;
export type CommandModule =
    | TextCommand
    | SlashCommand
    | BothCommand
    | ContextMenuUser
    | ContextMenuMsg
    | ButtonCommand
    | StringSelectCommand
    | MentionableSelectCommand
    | UserSelectCommand
    | ChannelSelectCommand
    | RoleSelectCommand
    | ModalSubmitCommand;

export type AnyModule = CommandModule | EventModule;

//https://stackoverflow.com/questions/64092736/alternative-to-switch-statement-for-typescript-discriminated-union
// Explicit Module Definitions for mapping
export type CommandModuleDefs = {
    [CommandType.Text]: TextCommand;
    [CommandType.Slash]: SlashCommand;
    [CommandType.Both]: BothCommand;
    [CommandType.CtxMsg]: ContextMenuMsg;
    [CommandType.CtxUser]: ContextMenuUser;
    [CommandType.Button]: ButtonCommand;
    [CommandType.StringSelect]: StringSelectCommand;
    [CommandType.RoleSelect]: RoleSelectCommand;
    [CommandType.ChannelSelect]: ChannelSelectCommand;
    [CommandType.MentionableSelect]: MentionableSelectCommand;
    [CommandType.UserSelect]: UserSelectCommand;
    [CommandType.Modal]: ModalSubmitCommand;
};

export type EventModuleDefs = {
    [EventType.Sern]: SernEventCommand;
    [EventType.Discord]: DiscordEventCommand;
    [EventType.External]: ExternalEventCommand;
};

export interface SernAutocompleteData
    extends Omit<BaseApplicationCommandOptionsData, 'autocomplete'> {
    autocomplete: true;
    type:
        | ApplicationCommandOptionType.String
        | ApplicationCommandOptionType.Number
        | ApplicationCommandOptionType.Integer;
    command: AutocompleteCommand;
}

export type CommandModuleNoPlugins = {
    [T in CommandType]: Omit<CommandModuleDefs[T], 'plugins' | 'onEvent'>;
};
export type EventModulesNoPlugins = {
    [T in EventType]: Omit<EventModuleDefs[T], 'plugins' | 'onEvent'>;
};

export type InputEvent = {
    [T in EventType]: EventModulesNoPlugins[T] & { plugins?: AnyEventPlugin[] };
}[EventType];

export type InputCommand = {
    [T in CommandType]: CommandModuleNoPlugins[T] & { plugins?: AnyCommandPlugin[] };
}[CommandType];

/**
 * Type that replaces autocomplete with {@link SernAutocompleteData}
 */
export type BaseOptions =
    | ApplicationCommandChoicesData
    | ApplicationCommandNonOptionsData
    | ApplicationCommandChannelOptionData
    | ApplicationCommandNumericOptionData
    | ApplicationCommandAttachmentOption
    | SernAutocompleteData;

export interface SernSubCommandData extends BaseApplicationCommandOptionsData {
    type: ApplicationCommandOptionType.Subcommand;
    required?: never;
    options?: BaseOptions[];
}

export interface SernSubCommandGroupData extends BaseApplicationCommandOptionsData {
    type: ApplicationCommandOptionType.SubcommandGroup;
    required?: never;
    options?: SernSubCommandData[];
}

export type SernOptionsData<U extends ApplicationCommandOptionData = ApplicationCommandOptionData> =
    U extends ApplicationCommandSubCommandData
        ? SernSubCommandData
        : U extends ApplicationCommandSubGroupData
        ? SernSubCommandGroupData
        : BaseOptions;
