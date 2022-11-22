
import { VariableContainer, MainContainer, VariableTableHeading, VariableTableBody, Line, VariableTitle, VariableText, VariableTableContainer } from "./styled"

export const Variables = () => {
    return(
        <MainContainer>
            <VariableTableContainer>
                <VariableTableHeading>
                    <VariableTitle>Variables</VariableTitle>
                </VariableTableHeading>
                <Line/>
                <VariableTableBody>
                    <VariableContainer>
                        <VariableText>
                            Maximo:
                        </VariableText>
                        <VariableText>
                            10
                        </VariableText>
                    </VariableContainer>
                    <Line/>
                    <VariableContainer>
                        <VariableText>
                            Minimo:
                        </VariableText>
                        <VariableText>
                            5
                        </VariableText>
                    </VariableContainer>
                </VariableTableBody>
            </VariableTableContainer>
        </MainContainer>
    )
}