import { FabricObject, Group, GroupProps } from "fabric"

export class NamedGroup extends Group {
    name: string
    constructor(
        objects: FabricObject[],
        options: Partial<GroupProps>,
        name: string
    ) {
        super(objects, options)
        this.name = name
    }
}
