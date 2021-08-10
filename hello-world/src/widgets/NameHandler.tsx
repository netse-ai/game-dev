import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';

import Greeter from './Greeter';

const factory = create({ icache });

export default factory(function NameHandler({ middleware: { icache } }) {
    let currentName = icache.get<string>('current-name') || '';
    return (
        <Greeter
            name={currentName}
            onNameChange={(newName) => {
                icache.set('current-name', newName);
            }}
        />
    );
});