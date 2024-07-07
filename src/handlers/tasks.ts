import * as Files from '../core/module-loading'
import { UnpackedDependencies } from "../types/utility";
import type { ScheduledTask } from "../types/core-modules";
import { relative } from "path";
import { fileURLToPath } from "url";

export const registerTasks = async (tasksPath: string, deps: UnpackedDependencies) => {
    const taskManager = deps['@sern/scheduler']
    for await (const f of Files.readRecursive(tasksPath)) {
        let { module } = await Files.importModule<ScheduledTask>(f);
        //module.name is assigned by Files.importModule<>
        // the id created for the task is unique
        const uuid = module.name+"/"+relative(tasksPath,fileURLToPath(f))
        taskManager.schedule(uuid, module, deps)
    }
}
