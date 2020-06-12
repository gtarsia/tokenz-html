
export class WalkCancelledInterrupt extends Error {
  constructor(msg) {
    super(msg)
    this.name = 'WalkCancelledInterrupt'
  }
}
export class WalkFailedInterrupt extends Error {
  constructor(msg) {
    super(msg)
    this.name = 'WalkFailedInterrupt'
  }
}
