export default class Waring implements IWarning {
  description: string
  title: string
  sender?: string
  start?: string
  end?: string
  status?: string
  level?: string
  type?: number
  typeName?: string
  related?: string
  urgency?: string

  constructor({
    description,
    title,
    status,
    level,
    type,
    typeName,
    related,
    sender,
    start,
    end,
    urgency,
  }: IWarning) {
    this.description = description
    this.title = title
    this.status = status
    this.level = level
    this.type = type
    this.typeName = typeName
    this.related = related
    this.sender = sender
    this.start = start
    this.end = end
    this.urgency = urgency
  }
}
