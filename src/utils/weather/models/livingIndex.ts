// Only Qweather supports

export default class LivingIndex implements ILivingIndex {
  type: number
  name: string
  level: number
  category: string
  description: string

  constructor({ type, name, level, category, description }: ILivingIndex) {
    this.type = type
    this.name = name
    this.level = level
    this.category = category
    this.description = description
  }
}
