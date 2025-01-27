import { FabricObject, Textbox } from "fabric"

interface ITextMixinOptions {
    text: string
    fontSize: number
    textColor: string
    placeholder: string
}

declare module "fabric" {
    interface FabricObject {
        textObject?: Textbox
        initializeText?(options: ITextMixinOptions): void
    }
}

export function addTextMixin() {
    return class extends FabricObject {
        textObject?: Textbox

        constructor(...args: any[]) {
            super(...args)
        }

        initializeText(options: ITextMixinOptions) {
            const textValue = options.text || options.placeholder || "Edit..."

            this.textObject = new Textbox(textValue, {
                fontSize: options.fontSize || 16,
                fill: options.textColor || "#333333",
                editable: true,
                left: this.left || 0,
                top: this.top || 0,
                originX: "center",
                originY: "center",
                selectable: false
            })

            this.on("added", () => {
                this.textObject!.left = this.left! + (this.width || 0) / 2
                this.textObject!.top = this.top! + (this.height || 0) / 2

                if (this.canvas) {
                    this.canvas.add(this.textObject!)
                }
            })

            this.on("moving", () => {
                if (this.textObject) {
                    this.textObject.left = this.left! + (this.width || 0) / 2
                    this.textObject.top = this.top! + (this.height || 0) / 2
                }
            })
            this.on("scaling", () => {
                if (this.textObject) {
                    this.textObject.scaleX = this.scaleX!
                    this.textObject.scaleY = this.scaleY!
                }
            })
        }
    }
}
