export type QueryResult<T> = {
  rows: T[];
}

interface Database {
  query: (queryString: string) => Promise<QueryResult<any>>;
  insertNewTimeBlock: (userId: number) => Promise<QueryResult<any>>;
}

export default Database