import * as path from 'path';

// tslint:disable:no-implicit-dependencies
import { virtualFs } from '@angular-devkit/core';
import { EmptyTree } from '@angular-devkit/schematics';
// tslint:disable-next-line:no-submodule-imports
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

describe('Update 8.2.0', () => {
    let appTree: UnitTestTree;
    const schematicRunner = new SchematicTestRunner('ig-migrate', path.join(__dirname, '../migration-collection.json'));
    const configJson = {
        defaultProject: 'testProj',
        projects: {
            testProj: {
                sourceRoot: '/testSrc'
            }
        },
        schematics: {
            '@schematics/angular:component': {
                prefix: 'appPrefix'
            }
        }
      };

    beforeEach(() => {
        appTree = new UnitTestTree(new EmptyTree());
        appTree.create('/angular.json', JSON.stringify(configJson));
    });

    it('should update Excel Style Filtering template selectors', done => {
        appTree.create(
            '/testSrc/appPrefix/component/custom.component.html',
            `<igx-grid [data]="data" height="500px" [autoGenerate]="true" [allowFiltering]='true' [filterMode]="'excelStyleFilter'">
                <ng-template igxExcelStyleSortingTemplate><div class="esf-custom-sorting">Sorting Template</div></ng-template>
                <ng-template igxExcelStyleHidingTemplate><div class="esf-custom-hiding">Hiding Template</div></ng-template>
                <ng-template igxExcelStyleMovingTemplate><div class="esf-custom-moving">Moving Template</div></ng-template>
                <ng-template igxExcelStylePinningTemplate><div class="esf-custom-pinning">Pinning Template</div></ng-template>
            </igx-grid>`);

        const tree = schematicRunner.runSchematic('migration-10', {}, appTree);
        expect(tree.readContent('/testSrc/appPrefix/component/custom.component.html'))
            .toEqual(
            `<igx-grid [data]="data" height="500px" [autoGenerate]="true" [allowFiltering]='true' [filterMode]="'excelStyleFilter'">
                <ng-template igxExcelStyleSorting><div class="esf-custom-sorting">Sorting Template</div></ng-template>
                <ng-template igxExcelStyleHiding><div class="esf-custom-hiding">Hiding Template</div></ng-template>
                <ng-template igxExcelStyleMoving><div class="esf-custom-moving">Moving Template</div></ng-template>
                <ng-template igxExcelStylePinning><div class="esf-custom-pinning">Pinning Template</div></ng-template>
            </igx-grid>`);

        done();
    });
});