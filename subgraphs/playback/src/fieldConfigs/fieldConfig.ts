import { NullifyOptionalProperties } from '../types/NullifyOptionalProperties';

export type FieldConfigID =
  `${FieldConfig['typename']}.${FieldConfig['fieldName']}`;

export interface Config {
  timeout: number;
  errorRate: number;
}

export class FieldConfig {
  public readonly typename: string;
  public readonly fieldName: string;
  public readonly id: FieldConfigID;
  public readonly config: Config;

  constructor(id: FieldConfigID, config?: Config) {
    const [typename, fieldName] = id.split('.');

    this.id = id;
    this.config = {
      timeout: config?.timeout || 0,
      errorRate: config?.errorRate || 0,
    };

    this.typename = typename;
    this.fieldName = fieldName;
  }

  update(config: NullifyOptionalProperties<Partial<Config>>) {
    this.__updateConfig('timeout', config.timeout, 0);
    this.__updateConfig('errorRate', config.errorRate, 0);

    return this;
  }

  private __updateConfig<TKey extends keyof Config>(
    key: TKey,
    value: Config[TKey] | null | undefined,
    defaultValue: Config[TKey]
  ) {
    if (value === undefined) {
      return;
    }

    if (value === null) {
      this.config[key] = defaultValue;
      return;
    }

    this.config[key] = value;
  }
}
