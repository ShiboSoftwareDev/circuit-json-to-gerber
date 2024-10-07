import { test, expect } from "bun:test"
import { excellonDrill } from "src/excellon-drill"

test("test that we can recreate an example drill file", async () => {
  const output_commands = excellonDrill()
    .add("M48", {})
    .add("header_comment", {
      text: "DRILL file {tscircuit} date 2024-04-09T20:34:41-0700",
    })
    .add("header_comment", {
      text: "FORMAT={-:-/ absolute / inch / decimal}",
    })
    .add("header_attribute", {
      attribute_name: "TF.CreationDate",
      attribute_value: "2024-04-09T20:34:41-07:00",
    })
    .add("header_attribute", {
      attribute_name: "TF.GenerationSoftware",
      attribute_value: "Kicad,Pcbnew,8.0.1",
    })
    .add("header_attribute", {
      attribute_name: "TF.FileFunction",
      attribute_value: "Plated,1,2,PTH",
    })
    .add("FMAT", { format: 2 })
    .add("header_comment", {
      text: "TA.AperFunction,Plated,PTH,ComponentDrill",
    })
    .add("T", { tool_number: 1, diameter: 0.0394 })
    .add("header_comment", { text: "End of header" })
    .add("G90", {})
    .add("G05", {})
    .add("T", { tool_number: 1, diameter: 0.0394 })
    .add("drill_at", { x: 4.9197, y: -2.9724 })
    .add("drill_at", { x: 5.0197, y: -2.9724 })
    .add("M30", {})
    .build()

    console.log(output_commands)
    expect(output_commands.find(elm=>elm.command_code === 'drill_at')).toHaveProperty('command_code','drill_at')

})
