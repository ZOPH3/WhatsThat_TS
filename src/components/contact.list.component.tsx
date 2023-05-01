import React, { Fragment } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import UserType from "../util/types/user.type";

function ContactListComponent(contactList: UserType[]) {
    return (

        <SafeAreaView>
            <ScrollView>
                {contactList.map((contact, key) => {
                    return <Fragment key={key}>
                        {
                            <ListItem
                                leadingMode="avatar"
                                leading={
                                    <Avatar label={`${contact.first_name} ${contact.last_name}`}
                                        autoColor
                                    />
                                }
                                title={`${contact.first_name} ${contact.last_name}`}
                                secondaryText={`${contact.email} ${contact.user_id}`}
                                trailing={props => <Icon name="chevron-right" {...props} />}
                                //TODO: remove contact or block
                                onPress={() => alert("CLICKED")}
                            />
                        }
                    </Fragment>
                })}
            </ScrollView>
        </SafeAreaView>

    )
}

export default ContactListComponent;