import * as path from 'path';

// tslint:disable:no-implicit-dependencies
import { EmptyTree } from '@angular-devkit/schematics';
// tslint:disable-next-line:no-submodule-imports
import {
    SchematicTestRunner,
    UnitTestTree,
} from '@angular-devkit/schematics/testing';

describe('Update 10.2.0', () => {
    let appTree: UnitTestTree;
    const schematicRunner = new SchematicTestRunner(
        'ig-migrate',
        path.join(__dirname, '../migration-collection.json')
    );
    const configJson = {
        defaultProject: 'testProj',
        projects: {
            testProj: {
                sourceRoot: '/testSrc',
            },
        },
        schematics: {
            '@schematics/angular:component': {
                prefix: 'appPrefix',
            },
        },
    };

    beforeEach(() => {
        appTree = new UnitTestTree(new EmptyTree());
        appTree.create('/angular.json', JSON.stringify(configJson));
    });

    it('should remove the type property if the value is not a valid type', async () => {
        appTree.create(
            '/testSrc/appPrefix/component/test.component.html',
            `<igx-input-group type="line"></igx-input-group><igx-input-group type="box"></igx-input-group><igx-input-group type="border"></igx-input-group><igx-input-group type="search"></igx-input-group><igx-input-group type="bootstrap"></igx-input-group><igx-input-group type="fluent"></igx-input-group><igx-input-group type="fluent_search"></igx-input-group><igx-input-group type="indigo"></igx-input-group><igx-input-group type='bootstrap'></igx-input-group><igx-input-group type='fluent'></igx-input-group><igx-input-group type='fluent_search'></igx-input-group><igx-input-group type='indigo'></igx-input-group>`
        );

        const tree = await schematicRunner
            .runSchematicAsync('migration-17', {}, appTree)
            .toPromise();
        expect(
            tree.readContent('/testSrc/appPrefix/component/test.component.html')
        ).toEqual(`<igx-input-group type="line"></igx-input-group><igx-input-group type="box"></igx-input-group><igx-input-group type="border"></igx-input-group><igx-input-group type="search"></igx-input-group><igx-input-group></igx-input-group><igx-input-group></igx-input-group><igx-input-group></igx-input-group><igx-input-group></igx-input-group><igx-input-group></igx-input-group><igx-input-group></igx-input-group><igx-input-group></igx-input-group><igx-input-group></igx-input-group>`);
    });
});
