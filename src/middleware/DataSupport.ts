import { Compiler, CompilerTarget } from "./Compiler"
import { ProxyBroadcast, ProxyEvent } from "./ProxyBroadcast"
import { Rule } from "./Rule"
import { Translater } from "./Translater"

export class DataSupport<D extends CompilerTarget, C extends Compiler> {
  private data: D
  private broadcast: ProxyBroadcast
  private translater: Translater<C>
  constructor (rule: Rule<C>, data: D) {
    this.translater = new Translater<C>().setRule(rule)
    this.broadcast = new ProxyBroadcast()
    this.data = this.broadcast.proxyExtends<D>(data)

    this.broadcast.addEventListener('broadcast', (event: ProxyEvent) => {
      this.translater.translate(event.notice)
    })
  }

  getData (): D {
    return this.data
  }

  addCompiler (compiler: C): this {
    compiler.setTarget(this.data)
    compiler.compileAll()
    this.translater.apply(compiler)
    return this
  }

  toJSON (): string {
    return JSON.stringify(this.data)
  }

  load (config: D): this {
    const data = this.data
    for (const key in config) {
      data[key] = config[key]
    }
    return this
  }
}