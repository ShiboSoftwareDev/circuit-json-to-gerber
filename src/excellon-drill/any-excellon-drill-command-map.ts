import type { z } from "zod"
import type { ExcellonDrillCommandDef } from "./define-excellon-drill-command"
import * as EDCMD from "./commands"

export const excellon_drill_command_map = {
  G00: EDCMD.G00,
  G01: EDCMD.G01,
  G85: EDCMD.G85,
  M48: EDCMD.M48,
  M95: EDCMD.M95,
  FMAT: EDCMD.FMAT,
  unit_format: EDCMD.unit_format,
  aper_function_header: EDCMD.aper_function_header,
  percent_sign: EDCMD.percent_sign,
  T: EDCMD.define_tool,
  define_tool: EDCMD.define_tool,
  use_tool: EDCMD.use_tool,
  G90: EDCMD.G90,
  G05: EDCMD.G05,
  M15: EDCMD.M15,
  M16: EDCMD.M16,
  M30: EDCMD.M30,
  drill_at: EDCMD.drill_at,
  header_comment: EDCMD.header_comment,
  header_attribute: EDCMD.header_attribute,
  rewind: EDCMD.rewind,
} satisfies Record<string, ExcellonDrillCommandDef<string, any>>

export type AnyExcellonDrillCommand = z.infer<
  (typeof excellon_drill_command_map)[keyof typeof excellon_drill_command_map]["schema"]
>
