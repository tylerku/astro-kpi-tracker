import {IDatabase} from '../../database'

export default class TimeBlockService {

  private database: IDatabase

  constructor(database: IDatabase) {
    this.database = database
  }

  getAllTimeBlocks = async () => {
    const res = await this.database.query('SELECT * FROM time_block')
    return res
  }
}