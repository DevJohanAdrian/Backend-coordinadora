export class RouteEntity {
    constructor(
      public id: number | null,
      public name: string,
      public origin: string,
      public destination: string,
      public distance_km: number,
      public estimated_time_minutes: number,
      public active: boolean,
    ) {}
  }