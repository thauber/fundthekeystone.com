#!/usr/bin/env npx ts-node --project ./tsconfig.repl.json --cwdMode
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import repl from "repl"
import * as tsnode from "ts-node"
import { type CreateOptions } from "ts-node"
import ts from "typescript"

const replService: tsnode.ReplService = tsnode.createRepl()
const options = {
  ...replService.evalAwarePartialHost,
  project: "tsconfig.repl.json",
  pretty: true,
} satisfies CreateOptions

const service = tsnode.create(options)
service.ts = ts
replService.setService(service)

// create a node-repl server
const replServer = repl.start({
  prompt: "onapproval-shell> ",
  ignoreUndefined: true,
  terminal: true,
  useColors: true,
  eval: replService.nodeEval.bind(replService),
})

/**
 * The next section just sets up some convenience functions
 * to make api calls easier.
 *
 * @example
 * onapproval-shell> await User.getByEmail("nick+local@onapproval.com")
 *
 */

/** Inject exports or else the compiler throws a bunch of warnings */
Object.defineProperty(exports, "__esModule", { value: true })
replServer.context.exports = exports
const localCtx: Record<string, unknown> = { }

/**
 * Dump all the keys in the context so you can introspect what
 * variables exist in the current repl context.
 *
 */
Object.keys(localCtx).forEach(key => {
  replServer.context[key] = localCtx[key]
})

/**
 * See what context variables exist
 *
 * @example
 *
 * onapproval-shell> ls
 */
replServer.defineCommand("ls", {
  help: "show context variables",
  action(variable) {
    if (!variable) {
      this.clearBufferedCommand()
      Object.keys(localCtx)
        .map(k => [k, ":", this.context[k]])
        .map(args => console.log(...args))
      this.displayPrompt()
    } else {
      // this.output(replServer.context[variable])
    }
  },
})

replServer.setupHistory(".repl.log", () => {
  replServer.clearBufferedCommand()
  console.log("History loaded from '.repl.log'\n")
  replServer.displayPrompt()
})
