import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecordState } from ".";

export const RecordSelector = createFeatureSelector<RecordState>('base');

export class RecordSelectors {
    static getLastActionType = createSelector(
        RecordSelector,
        state => state.lastActionType
    );

    static getRecordUpdatedFlag = createSelector(
        RecordSelector,
        state => state.recordUpdatedFlag
    );

    static getError = createSelector(
        RecordSelector,
        state => state.error
    );
}