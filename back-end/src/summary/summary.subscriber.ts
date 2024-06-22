import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';

import { Summary } from './entities/summary.entity';

@EventSubscriber()
export class SummarySubscriber implements EntitySubscriberInterface<Summary> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return Summary;
    }

    beforeInsert(event: InsertEvent<Summary>) {
        console.log(`BEFORE Summary INSERTED: `, event.entity);
    }
}