import { expect, test } from "bun:test"
import type { AnyCircuitElement } from "circuit-json"
import {
  convertSoupToExcellonDrillCommands,
  stringifyExcellonDrill,
} from "src/excellon-drill"
import { convertSoupToGerberCommands } from "src/gerber/convert-soup-to-gerber-commands"
import { stringifyGerberCommandLayers } from "src/gerber/stringify-gerber"
import { maybeOutputGerber } from "tests/fixtures/maybe-output-gerber"
import reproCircuitJson from "tests/gerber/assets/repro.json"

test("generates svg snapshots for repro asset", async () => {
  const circuitJson = reproCircuitJson as AnyCircuitElement[]
  const gerberOutput = stringifyGerberCommandLayers(
    convertSoupToGerberCommands(circuitJson),
  )
  const platedDrillOutput = stringifyExcellonDrill(
    convertSoupToExcellonDrillCommands({
      circuitJson,
      is_plated: true,
    }),
  )
  const unplatedDrillOutput = stringifyExcellonDrill(
    convertSoupToExcellonDrillCommands({
      circuitJson,
      is_plated: false,
    }),
  )

  await maybeOutputGerber(gerberOutput, platedDrillOutput)

  expect({
    ...gerberOutput,
    "drill.drl": platedDrillOutput,
    "drill_npth.drl": unplatedDrillOutput,
  }).toMatchGerberSnapshot(import.meta.path, "repro")
})
