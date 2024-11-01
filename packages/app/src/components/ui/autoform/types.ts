/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { ExtendableAutoFormProps } from "@autoform/react";
import type { FieldValues } from "react-hook-form";

export interface AutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {}