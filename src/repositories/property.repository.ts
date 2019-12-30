import {DefaultCrudRepository} from '@loopback/repository';
import {Property, PropertyRelations} from '../models';
import {StarmyAgentDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {
  constructor(
    @inject('datasources.StarmyAgent') dataSource: StarmyAgentDataSource,
  ) {
    super(Property, dataSource);
  }
}
