import { cloneDeep } from "lodash";
import React from "react";
import { getSavedSearches } from "../../hooks";
import { getToken } from "../../utils/getUserInformations";
import { generateAllFilterTagLabels } from "../../utils/transformFilterTagsIntoLabels";


export const setupSavedSearches = async ({
    dataSearchSaved,
    setDataSearchSaved,
    savedSearches,
    setRetrievedSavedSearches
}) => {

    await getSavedSearches({ token: getToken() }, (err: any, response: any) => {
        let { data, status } = response;
        if (err) {
            console.log(err);
            if (err.toString().includes('403')) {
                return;
            }
            //Handle err for front
        } else if (status === 200 || status === 201) {
            data = data.sort(
                (
                    { creationDate: creationDateA }: { creationDate: string },
                    { creationDate: creationDateB }: { creationDate: string },
                ) => {
                    return (
                        new Date(creationDateB).getTime() -
                        new Date(creationDateA).getTime()
                    );
                },
            );
            setDataSearchSaved(cloneDeep(data));

            const retrievedSavedSearch = data.map((savedSearch: any) => {
                savedSearch.criteria = generateAllFilterTagLabels(
                    savedSearch.criteria,
                );
                return savedSearch;
            });
            setRetrievedSavedSearches(retrievedSavedSearch);
        }
    });
}
